import React, {Component} from 'react';

import Header from './../../components/Header/Header'


import './styles.css';

export default class About extends Component{
    render(){
        return (
            <div className = "about">
                <Header title="Sobre Nós"/>
                <div className="team">
                    <div className="card">
                        <div className = "group">
                            <h1>Gerente de Projeto</h1>
                            <ul>
                                <li>Klisman Maia</li>
                            </ul>
                        </div>
                        <div className = "group">
                            <h1>Designers</h1>
                            <ul>
                                <li>Débora Colyer</li>
                                <li>Isabella Melo</li>
                            </ul>
                        </div>
                        <div className = "group">
                            <h1>Desenvolvedores</h1>
                            <ul>
                                <li>Arley Novais</li>
                                <li>Ian Marcony</li>
                                <li>José Leão</li>
                                <li>Kirk Sahdo</li>
                                <li>Lorenzo Windmöller</li>
                                <li>Pedro Araújo</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}