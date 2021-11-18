import React from "react";
import '../Home/Home.css';
import Insta from '../../Assets/instagram.png';
import Face from '../../Assets/facebook.png';
import Whatsapp from '../../Assets/Whatsapp.png';
import Header from '../Header';

export default function () {
    return (
        <div className="home">
            <Header />
            <h1 className="welcome">
                Bem-Vindo(a)<br />
                ao<br />
                Make Up!
            </h1>
            <br />
            <p className="intro">
                Tudo o que você precisa de maquiagem <br />
                a um clique de você. <br />
                Garanta seus produtos e arrase nas make!
            </p>
            <br />
            <div className="contatos">
                <a href="https://www.instagram.com/" target="_blank">
                    <img id="insta" src={Insta} alt="" width="30px" />
                </a>
                <a href="https://www.facebook.com/" target="_blank">
                    <img id="face" src={Face} alt="" width="30px" />
                </a>
                <a href="https://www.whatsapp.com/" target="_blank">
                    <img id="wpp" src={Whatsapp} alt="" width="30px" />
                </a>
            </div>
        </div>
    )
}