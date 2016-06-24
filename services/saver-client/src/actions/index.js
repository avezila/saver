import * as types from '../constants/ActionTypes';
import ByteBuffer from "bytebuffer";
import protobufjs from "protobufjs";
import saver from "../../grpc/saver/saver.pb.js";

export function filterRows(hash, from, count) {
    return {
        type: types.FILTER_ROWS,
        hash,
        from,
        count
    };
}

export function renderRows(rows, max) {
    return {
        type: types.RENDER_ROWS,
        rows,
        max,
    };
}


function GenBufer(len) {
    let arr = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        arr[i] = Math.floor(Math.random() * 256);
    }
    arr = ByteBuffer.wrap(arr);
    return arr;
}


let sn = 2;
let socket = [];
let queue = [];
function open(i) {
  return new Promise((res,rej)=>{
    var s = new WebSocket(`ws://${window.location.hostname}:5354/grpc${i}`);
    s.binaryType = "arraybuffer";
    s.onopen = function(){
      socket[i] = s;
      res(s);
    }
    s.onclose = function() {
      socket[i] = open(i);
    }
    s.onmessage = function(event) {
      let resolve = queue[i].shift();
      if (!resolve) return;
      window.RESE = event
      resolve(event.data);
    };
    return s;
  });
}

for (var i = 0; i < sn; i++) {
    socket.push(open(i));
    queue.push([]);
};

function concatTypedArrays(a, b) {
    var c = new(a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
}

function send(s, m) { 
  return Promise.resolve(socket[s]).then((sok)=>{
    switch (s) {
        case 0:
            m = (new saver.saver.PushRowReq(m)).toArrayBuffer();
            break;
        case 1:
            m = (new saver.saver.FilterRowsReq(m)).toArrayBuffer();
            break;
        default:
            return;
    }
    let len = new Uint8Array((new Uint32Array([m.byteLength])).buffer)

    m = new Uint8Array(m);
    let data = concatTypedArrays(len, m);

    let q = new Promise((resolve, reject) => {
        queue[s].push((res) => {
            switch (s) {
                case 0:
                    res = saver.saver.PushRowRes.decode(res);
                    break;
                case 1:
                    res = saver.saver.FilterRowsRes.decode(res);
                    break;
                default:
                    return;
            }
            resolve(res);
          
        });
        sok.send(data.buffer);
    });
    return q;
  });
}

socket.onmessage = function(evt) {
    try {
        // Decode the Message
        var msg = Message.decode(evt.data);
        log.value += "Received: " + msg.text + "\n";
    } catch (err) {
        log.value += "Error: " + err + "\n";
    }
};
window.S = saver.saver;

export function pushRows(num = 3, len = 256) {
    return function(dispatch) {
        let rows = [];
        for (var i = 0; i < num; i++)
            rows.push({
                id: Math.random().toString(36).substring(2),
                data: GenBufer(len)
            });
        let q = Promise.resolve();

        for (var i = 0; i < num; i++) {
            q = q.then((i,res)=>{
              return send(0,{row:rows[i]});
              //console.log("pushing", rows[i].data.toString("hex"));
            }.bind(this,i));
        }
        q = q.then(()=> dispatch(fetchRows("", 0, 10)));
        return q;
    }
}


export function fetchRows(hash, from, count) {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function(dispatch) {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(filterRows(hash, from, count));

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.
        
        return send(1,{
          id : hash,
          from : from,
          count: count,
        }).then(res => {
            return dispatch(renderRows(res.rows, res.max));
        });
    }
}