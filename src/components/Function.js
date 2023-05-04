export function undefinedFix(){
  for(let el of arguments) if (el === undefined) {
    el = '';
  }
}

export function messageCut(txt, length){
  return  txt?.length >= length ? txt = txt.slice(0,length).concat("...") : txt;
}

export function mergeData(data1, data2) {
  const map1 = data1.map(item => item);
  const map2 = data2.map(item => item);
  const map = new Map();
  map1.forEach(item => map.set(item.id, item));
  map2.forEach(item => map.set(item.id, {...map.get(item.id), ...item}));
  const mergeFriendInfo = Array.from(map.values());
  return mergeFriendInfo;
} 
