import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/editPersonCard.css';
import ButtonGreen from './ButtonGreen';
import TitleCard from './TitleCard';
import PersonService from '../services/person-service';
import authHeader from '../services/auth-header';

const EditMyProfile = (props) => {

    const [person, setPerson] = useState({ firstName: "" });
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        }
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    API_URL + "/api/v1/person/myprofile/", requestOptions
                )
            ).json();
            setPerson(data);
        };
        dataFetch();
    }, [API_URL]);

    const handleOnChange = (event) => {
        event.preventDefault();
        setPerson({
            ...person,
            [event.target.name]: event.target.value
        });
    }

    const handleUpdatePhone = (e) => {
        e.preventDefault();
        PersonService.updatePhone(
            person.phone
        ).then(
            response => {
                alert("Se ha editado satisfactoriament sus datos ")
                window.location.reload(true);
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                alert("Ha ocurrido un error,por favor revise los datos ingresados")
                console.log(resMessage)
            }
        );
    }


    return (
        <div className='contenedor-form-edit'>
             <TitleCard text="Editar Mi perfil" />
            <form className='form-register' onSubmit={handleUpdatePhone}>
                <div className="form-floating" id="input-form">
                    <input type="text" name="firstName" className="form-control" id="floatingName" value={person.firstName}
                        required></input>
                    <label className="form-label" htmlFor="floatingName">Nombres</label>
                </div>
                <div className="form-floating" id="input-form">
                    <input type="text" name="lastName" className="form-control" id="floatingLastNames" placeholder="lastname"
                        value={person.lastName} required></input>
                    <label className="form-label" htmlFor="floatingLastNames">Apellidos</label>
                </div>
                <div className="form-floating" id="input-form">
                    <input type="email" name="email" className="form-control" id="floatingEmail" placeholder="name@example.com"
                        value={person.email} required></input>
                    <label className="form-label" htmlFor="floatingEmail">Correo</label>
                </div>
                <div className="form-floating" id="input-form">
                    <input type="number" name="phone" className="form-control" id="floatingPhone" value={person.phone}
                        onChange={handleOnChange} required></input>
                    <label className="form-label" htmlFor="floatingPhone">Telefono</label>
                </div>
                <div className="form-floating" id="input-form">
                    <input type="number" name="dni" className="form-control" id="floatingCedula" placeholder="Password" value={person.dni}
                        required></input>
                    <label className="form-label" htmlFor="floatingCedula">Cédula</label>
                </div>
                <div className="form-floating" id="input-form">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        name="newPassword"
                        ></input>
                    <label className="text-input" htmlFor="floatingPassword">Contraseña Nueva</label>
                </div>
                <div className="form-floating" id="input-form">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        name="newPassword"
                        ></input>
                    <label className="text-input" htmlFor="floatingPassword">Contraseña Actual</label>
                </div>
                <ButtonGreen id="submit-button" text="Guardar" type="Submit" />
            </form>
        </div>
    )

}

export default EditMyProfile;