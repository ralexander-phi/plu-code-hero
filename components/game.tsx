import { Component } from 'react';
import Data from './data';

const produceInfo = new Data().produceInfo;

interface GameState {
  playing: Boolean
  started: Date
  ended: Date
  score: Number
  hearts: Number
  currentCode: String 
  guessText: String
  helpText: String
}

export default class Game extends Component<{}, GameState> {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      started: null,
      ended: null,
      score: 0,
      hearts: 0,
      currentCode: '',
      guessText: '',
      helpText: '',
    };
  }

  showNextItem() {
    const choices = Object.keys(produceInfo);
    var nextCode = this.state.currentCode;

    // Ensure we change to a new item
    while (nextCode == this.state.currentCode) {
      var index = Math.floor(Math.random() * choices.length);
      nextCode = choices[index];
    }

    this.setState({
      playing: true,
      started: new Date(),
      ended: null,
      currentCode: nextCode,
      guessText: '',
      helpText: '',
    });
  }

  render() {
    if (this.state.playing) {
      if (this.state.hearts > 0) {
        return (
          <div className="container">
            <div className="field is-grouped is-grouped-multiline ml-6">
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-danger is-medium">Lives</span>
                  <span className="tag is-dark is-medium">{ this.state.hearts }</span>
                </div>
              </div>

              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-success is-medium">Score</span>
                  <span className="tag is-dark is-medium">{ this.state.score }</span>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-4 m-4">
                <section className="box m-4 p-6">
                  <p className="has-text-centered is-size-5 pt-5">{
                    produceInfo[this.state.currentCode].category + ' ' +
                    produceInfo[this.state.currentCode].sub_category + ' ' +
                    produceInfo[this.state.currentCode].variety + ' ' +
                    produceInfo[this.state.currentCode].size
                  }</p>
                </section>
              </div>

              <div className="column is-4 m-4">
                <section className="box m-4 p-6">
                  <form id="plu-form">
                    <div className="field">
                      <label className="label">PLU Code</label>
                      <div className="control">
                        <input
                          id="code"
                          type="text"
                          className="input"
                          autoComplete="off"
                          onChange={
                            e => {
                              this.setState({ 
                                guessText: e.target.value,
                              });
                            }}
                          value={this.state.guessText} />
                      </div>

                      <p className="help is-danger">{this.state.helpText}</p>
                    </div>
                    <br />
                    <input type="submit" autoFocus className="button is-primary" value="Enter" onClick={
                      (e) => {
                        e.preventDefault();
                        const guess = this.state.guessText.trim();
                        if (guess == this.state.currentCode) {
                          this.setState({
                            score: this.state.score + 1,
                          });
                          this.showNextItem();
                        } else {
                          var newHearts = this.state.hearts - 1;
                          var newEnded = newHearts > 0 ? null : new Date();
                          this.setState({
                            hearts: newHearts,
                            ended: newEnded,
                            helpText: "Incorrect: " + this.state.currentCode,
                          });
                        }
                      }
                    }></input>
                  </form>
                </section>
              </div>

            </div>
          </div>
        );
      } else {
        return (
          <section className="hero is-warning is-medium mt-6">
          <div className="hero-body">
          <h3 className="subtitle is-6">Game Over</h3>
          <p>You got { this.state.score } correct in { (this.state.ended.getTime() - this.state.started.getTime()) / 1000 } seconds</p>
          <button
            className="button is-dark mt-5"
            onClick={(e) => {
              this.setState({
                playing: false,
              });
            }}>
            Reset
          </button>
          </div>
          </section>
        );
      }
    } else {
      return (
        <section className="hero is-primary is-medium mt-6">
        <div className="hero-body">
        <h3 className="title is-4">Can you master an onslaught of price look-up (PLU) codes?</h3>
        <button
          className="button is-primary is-medium is-inverted mt-3"
          onClick={(e) => {
            this.setState({
              hearts: 5,
              score: 0,
            });
            this.showNextItem();
          }}>
          Start
        </button>
        </div>
        </section>
      );
    }
  }
}

