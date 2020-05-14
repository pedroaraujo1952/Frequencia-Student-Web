import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import * as VocationalTestController from "../../controllers/VocationalTestController";
import * as User from "../../controllers/UserController";

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

        answers: '',
        user: null,
    };

    this.state.test.init();
  }
  
  
  async componentDidMount() {
    this.setState({ user: await User.getUser(
        localStorage.getItem("uid")) 
    });

    if (this.state.user.test_answers) {
      this.setState({ back_home: true });
    }
  }

  handleChange = (event) => {
    var { current_answer } = this.state;

    current_answer = event.target.value;

    this.setState({ current_answer })
  };

  sendResult = async (answers) => {
    await VocationalTestController
        .sendVocationalTestInfoToDatabase(
            localStorage.getItem("uid"),
            this.props.location.state.user,
            answers);
  }

  render() {
    if (this.state.back_home) return <Redirect to="/" />;
    
    return (
        <div className="vocational-test">
            <Backdrop loading={this.state.loading} />
            {!this.state.test_started ? 
                <div>
                    {!this.state.test_finished ?
                        <div>
                            <div className="school-text">
                                <img src={Logo} alt="Frequencia" />  
                            </div>
                            
                            <div className="test-text">
                                <h1>TESTE VOCACIONAL</h1>
                            </div>
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
                        </div>
                    : 
                        <div className="test-result">
                            <h1>Resultado</h1>
                            <h2>Área:</h2>
                            <h3>{this.state.result.area}</h3>
                            <h2>Descrição:</h2>
                            <h3>{this.state.result.description}</h3>
                            <h2>Profissões:</h2>
                            <h3>{this.state.result.professions}</h3>
                            <div className="test-result-button">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.setState({
                                        back_home: true,
                                    });
                                }}>
                                    Voltar para home
                                </button>
                            </div>
                        </div>
                    }
                </div>
            :
                <div>
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
                                var { current_group, 
                                    current_question, 
                                    current_answer, 
                                    answers, 
                                } = this.state;
                                
                                if (!current_answer) {
                                    return;
                                }

                                answers += current_answer + '-'

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
                                    answers
                                });

                                window.scrollTo(0, 0);
                            }}>
                                Próximo
                            </button>
                        </div>
                    : 
                        <div className="end-button">
                            <button onClick={(ev) => {
                                ev.preventDefault();
                                var { current_answer, answers } = this.state;
                                
                                if (!current_answer) {
                                    return;
                                }

                                answers += current_answer;
                                
                                this.state.test.increase(this.state.current_answer)

                                var { result } = this.state;

                                result = this.state.test.getResult();

                                this.setState({
                                    test_started: false,
                                    test_finished: true,
                                    result,
                                    answers,
                                });

                                this.sendResult(answers);
                                
                                window.scrollTo(0, 0);
                            }}>
                                Finalizar
                            </button>
                        </div>
                    }
                </div>
            }
        </div>
    
    );
  }
}
