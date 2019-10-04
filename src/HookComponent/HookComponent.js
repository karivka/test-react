import React, {useState, useEffect} from "react";
import {Button} from "react-bootstrap";

const HookComponent = props => {
    const [ myState, setStateFunc] = useState(
        true
    );

    useEffect(() => {
       console.log("use effect");
       setTimeout(() => {
           alert("data fetched");
       }, 1000)
        return () => {
           console.log("Hook component clean up");
        }
    }, []);

    const [ myState2, setStateFunc2] = useState({
        otherProperty: 10
    });

    const clickHandler = () => {
        setStateFunc(!myState);
    }

    const clickHandler2 = () => {
        setStateFunc2({otherProperty: myState2.otherProperty + 1});
    }

    console.log("myState", myState, myState2);

    return (
      <div>
          <p>parent prop {props.prop1}</p>
          <p>state prop {myState ? "ON" : "OFF"}</p>
          <p>state other prop {myState2.otherProperty}</p>
          <Button size="sm" className="mr-2" onClick={clickHandler}>Switch</Button>
          <Button size="sm" className="mr-2" onClick={clickHandler2}>+</Button>
      </div>
    );
};

export default HookComponent;
