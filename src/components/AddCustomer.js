import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import customerService from "../services/customer.service";

const AddCustomer = () => {
  const [vardas, setFirstName] = useState('');
    const [pavarde, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [tipas, setType] = useState('');
    const [adresas, setAddress] = useState('');
    const [telNumeris, setPhone] = useState('');
    const [klientoStatusas, setCustomerStatus] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();


    const customer = {vardas, pavarde, email, tipas, adresas, telNumeris, klientoStatusas, id};
    const saveCustomer = (e) => {
        e.preventDefault();
        console.log(customer);
        
        if (id) {
            // update record
            customerService.update(customer)
                .then(response => {
                    console.log('Employee data updated successfully', response.data);
                    navigate('/customers'); 
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        } else {
            // create new record
            customerService.create(customer)
            .then(response => {
                console.log('Employee added successfully',  response.data);
                navigate('/customers');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    }

    useEffect(() => {
        console.log(customer)
        if (id) {
          customerService.get(id)
                .then(customer => {
                    setFirstName(customer.data.vardas);
                    setLastName(customer.data.pavarde);
                    setEmail(customer.data.email);
                    setType(customer.data.tipas);
                    setAddress(customer.data.adresas);
                    setPhone(customer.data.telNumeris);
                    setCustomerStatus(customer.data.klientoStatusas);
                    
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    },[])

    return(
        <div className="container">
            <h3>Prid??ti klient??</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="vardas"
                        value={vardas}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="??veskite vard??"
                     />

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="pavarde"
                       value={pavarde}
                       onChange={(e) => setLastName(e.target.value)}
                       placeholder="??veskite pavard??"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="??veskite el. pa??t??"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="tipas"
                       value={tipas}
                       onChange={(e) => setType(e.target.value)}
                       placeholder="??veskite tip??"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="adresas"
                       value={adresas}
                       onChange={(e) => setAddress(e.target.value)}
                       placeholder="??veskite adres??"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="telNumeris"
                       value={telNumeris}
                       onChange={(e) => setPhone(e.target.value)}
                       placeholder="??veskite telefono numer??"
                    /> 

                </div>
                <div className="form-group ">
                    <select className="form-control col-4" onChange={(e) => setCustomerStatus(e.target.value)}>
                     <option value="Aktyvus">Aktyvus</option>
                    <option value="Neaktyvus">Neaktyvus</option>
                    </select>   
                </div>
                <br />
                <hr/>
                <div>
                    <button onClick={(e) => saveCustomer(e)}
                    className="btn btn-primary">Save</button>
                    <button onClick={() => navigate('/customers')} className="btn btn-info ml-2 ">
                        Atgal ?? s??ra????
                    </button>
                </div>
            </form>
            <hr/>
        </div>
    )
};

export default AddCustomer;
