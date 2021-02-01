
//Using references (Normalization)
let author = {
    name: 'Parth'
}

let course = {
    author: 'id'
}

//Using Embedded Document (Denormalization)

let course={
    author:{
        name:'Parth'
    }
}

//Hybrid 
let author={
    name:'Parth'
    // 50 other properties
}

let course ={
    author: {
        id: 'ref',
        name: 'Parth'
    }
}