import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import * as VocationalTestController from "../../controllers/VocationalTestController";

import Data from './Data'

import Logo from "../../assets/Freq.png";

import Backdrop from "../../components/Backdrop/Backdrop";

import "./styles.css";

export default class VocationalTest extends Component {
  constructor() {
    super();

    this.state = {
        test: new Data(),
        loading: false,
        back_home: false,

        test_started: false,
        test_finished: false,
        result: null,

        current_group: -1,
        current_question: -1,
        current_answer: '',
    };

    this.state.test.init();
  }
  
  handleChange = (event) => {
    var { current_answer } = this.state;

    current_answer = event.target.value;

    this.setState({ current_answer })
  };

  sendResult = async (letter) => {
    await VocationalTestController
        .sendVocationalTestInfoToDatabase(
            localStorage.getItem("uid"),
            this.props.location.state.user, 
            letter);
  }

  render() {
    if (this.state.back_home) return <Redirect to="/" />;
    
    return (
        <div className="vocational-test">
            <Backdrop loading={this.state.loading} />
            {!this.state.test_started ? 
                <div>
                    <div className="school-text">
                        <img src={Logo} alt="Frequencia" />  
                    </div>
                    
                    <div className="test-text">
                        <h1>Teste Vocacional</h1>
                    </div>

                    {!this.state.test_finished ?
                        <div className="init-button">
                            <button onClick={(ev) => {
                                ev.preventDefault();
                                this.setState({ 
                                    test_started: true,
                                    current_group: 0,
                                    current_question: 0,
                                });
                            }}>
                                Iniciar agora
                            </button>
                        </div>
                    : 
                        <div className="test-result">
                            <h1>Resultado</h1>
                            <h2>Área: {this.state.result.area}</h2>
                            <h2>Descrição: {this.state.result.description}</h2>
                            <h2>Profissões: {this.state.result.professions}</h2>
                            <button onClick={(ev) => {
                                ev.preventDefault();
                                this.setState({
                                    back_home: true,
                                });
                            }}>
                                Voltar para home
                            </button>
                        </div>
                    }
                </div>
            :
                <div>
                    {/*{(this.state.current_question > 0 && this.state.current_group === 0) 
                    || (this.state.current_group > 0) ?
                        <div className="back-button">
                            <button onClick={(ev) => {
                                ev.preventDefault();
                                var { current_group, current_question } = this.state;
                                
                                current_question -= 1;

                                if (current_question === -1) {
                                    current_group -= 1;
                                    current_question = this.state.test
                                    .data[this.state.current_group][0].length - 1;
                                }
                                
                                this.setState({
                                    current_group,
                                    current_question 
                                });
                            }}>
                                Voltar
                            </button>
                        </div>
                    : null}*/}

                    <div className="group-name">
                        <h1>{this.state.test.data[this.state.current_group][1]}</h1>
                    </div>
                    
                    <div className="choices">
                        <FormControl component="fieldset">
                            <RadioGroup 
                                value={this.state.current_answer} 
                                onChange={this.handleChange}>
                                {this.state.test.data[this.state.current_group][0][this.state.current_question].map((choice, index) => 
                                    <FormControlLabel value={choice[0]} control={<Radio />} key={index} label={choice[1]} />
                                )}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    
                    {(this.state.current_question < this.state.test.data[this.state.current_group][0].length - 1 
                    && this.state.current_group === this.state.test.data.length - 1) 
                    || (this.state.current_group < this.state.test.data.length - 1) ?
                        <div className="go-button">
                            <button onClick={(ev) => {
                                ev.preventDefault();
                                var { current_group, current_question, current_answer } = this.state;
                                
                                if (!current_answer) {
                                    return;
                                }

                                current_answer = '';

                                this.state.test.increase(this.state.current_answer);

                                current_question += 1;

                                if (current_question === this.state.test
                                    .data[this.state.current_group][0].length) {
                                    current_group += 1;
                                    current_question = 0;
                                }
                                
                                this.setState({
                                    current_group,
                                    current_question,
                                    current_answer,
                                });
                            }}>
                                Próximo
                            </button>
                        </div>
                    : 
                        <button onClick={(ev) => {
                            ev.preventDefault();
                            var { current_answer } = this.state;
                            
                            if (!current_answer) {
                                return;
                            }
                            
                            this.state.test.increase(this.state.current_answer)

                            var { result } = this.state;

                            result = this.state.test.getResult();

                            this.setState({
                                test_started: false,
                                test_finished: true,
                                result
                            });

                            this.sendResult(result.letter);
                        }}>
                            Finalizar
                        </button>
                    }
                </div>
            }
        </div>
    
    );
  }
}
