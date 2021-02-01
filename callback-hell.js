console.log('before');

setTimeout(()=>{
    console.log('first');
    setTimeout(()=>{
        console.log('second');
        setTimeout(()=>{
            console.log('third');
            setTimeout(()=>{
                console.log('fourth');
            },1000)
        },1000)
    },1000)
},1000);

console.log('after');