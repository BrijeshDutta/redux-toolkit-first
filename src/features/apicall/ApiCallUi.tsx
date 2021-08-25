import React , {useEffect} from 'react'
import { apicallaction, fromuseeffect, getPowerValuationDetailsAsync, PowerValuationDetails, selectPowerValuationDetails , selectStatus} from './apiCallSlice'
import { useAppSelector,useAppDispatch } from '../../app/hooks';

function ApiCallUi() {
    const powerValuationDetails = useAppSelector(selectPowerValuationDetails);
    const status = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();


    


  useEffect(() =>{

    // // console.log('called from api call ui')
    // if(powerValuationDetails[0].id === 0)
    // {
    //     console.log(powerValuationDetails[0].id)    
    //       //dispatch(fromuseeffect(defaultStateUSeEffect))
    // }

    // console.log(powerValuationDetails[0].id)

    console.log('status', status)
    console.log('From Use Effect', powerValuationDetails)
    

  }, [powerValuationDetails, status])






    return (
        <div>
            <h1>Calling Api...</h1>

            {status === 'success' && powerValuationDetails[0].data.map((item)=>{
            return (
                <div key={item.id}>{item.id } | {item.trade} | {item.begtime} | {item.endtime}</div>
            )
            })}

            {status==='loading' && powerValuationDetails.length === 0 && (
                <div> No contetnts... </div>
            )}  



            <div> {status}</div>

            <button onClick={() => dispatch(getPowerValuationDetailsAsync())}> Get Data from Api</button>

            {


            }
        </div>
    )
}

export default ApiCallUi
