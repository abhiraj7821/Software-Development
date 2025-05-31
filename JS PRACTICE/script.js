// // let person={
// //     name:'abhishek',
// //     age:22,

// //     intro : function(){
// //         console.log("Hi, myself",this.name,"and my age is",this.age);
// //     }
// // };

// // person.intro()



// // let num=[10,20,30,40,50,60];

// // let greater60=num.filter((value)=>{
// //     return value>=30;
// // })


// // console.log(greater60);




// // let num=[-2,-3,4,5,-2,4,5,10,20,100,-100]

// // num.sort();

// // console.log(num);




// // function sum(p,r=5,t=5){
// //     return ((p*r*t)/100);
// // }

// // console.log(sum(100,t=2));


// let person={
//     fName:'Love',
//     lName:'Babber'
// }

// console.log(person);

let waada1=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log("I'm in Waada1!");
        return 9924
    },2000);
    resolve(1234)
})

waada1.then(()=>{
    let waada2=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("I'm in Waada2!");
        },5000);
        resolve(5678)
    })

    waada2.then(()=>{
        let waada3=new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log("I'm in Wadda3!");
            },6000)
            resolve(9101112)
        })
        waada3.then(()=>{console.log("Wadda3 Completed");
        })
    })
})




