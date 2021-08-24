import React, {useState, useEffect} from 'react';

function HookStateExample() {

    // State: a counter value
    const [counter, setCounter] = useState(1);


    // Action: code that causes an update to the state when something happens
    function increment(){

        setCounter(counter => counter+1)
    }


    const obj = [{

        a:{
            c:3
        }, 
        b:2
    }
    ]



    const obj2 = [{
        //copy object 
        ...obj, 
        //overite a

        a:{

            // obj.a =
            //...obj.a,
            c: 452
        }
    }
    ]




    useEffect(() => {

        //setCounter(2);
        console.log(counter);
    }, [counter])
    return (


        <div>
            <p>You Clicked {counter} | {obj[0].a.c} | {obj2[0].a.c}</p>
            <button  onClick={increment}>Click me bastard</button>
            <button  onClick={()=> setCounter(counter-1)}>Click me muther fucker</button>
        </div>
    );


};

export default  HookStateExample;

