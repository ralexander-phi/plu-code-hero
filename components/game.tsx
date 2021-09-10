import { Component } from 'react';
import Data from './data';
import Item from './item';

const produceInfo = new Data().produceInfo;
const levels = new Data().levels;

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
    const choices = levels['popular fruit'];
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
          <div className="container mt-6" style={{ width: "30em" }}>
            <div className="field is-grouped is-grouped-multiline">
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

            <p className="has-text-centered is-size-4 p-5 m-6">{
              <Item
                category={ produceInfo[this.state.currentCode].category }
                sub_category={ produceInfo[this.state.currentCode].sub_category }
                variety={ produceInfo[this.state.currentCode].variety }
                size={ produceInfo[this.state.currentCode].size }
                />
            }</p>

            <form id="plu-form" style={{ textAlign: "center" }}>
              <div className="field">
                <input
                  id="code"
                  type="number"
                  className="input"
                  autoComplete="off"
                  onChange={
                    e => {
                      this.setState({ 
                        guessText: e.target.value,
                      });
                    }}
                  style={{ width: "8em"}}
                  value={this.state.guessText} />
                <input type="submit" autoFocus className="button is-primary ml-4" value="Enter" onClick={
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
                        helpText: "Incorrect. Try " + this.state.currentCode,
                      });
                    }
                  }
                }></input>
                <p className="help is-danger">{this.state.helpText}</p>
              </div>
            </form>
          </div>
        );
      } else {
        return (
          <section className="hero is-success is-fullheight">
          <div className="hero-head">
          </div>
          <div className="hero-body">
            <div class="container has-text-centered">
              <h3 className="subtitle is-2">Out of lives!</h3>
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
          </div>
          <div class="hero-foot"></div>
          </section>
        );
      }
    } else {
      return (
        <>
        <section className="hero is-small">
          <div className="hero-body">
            <div className="container has-text-centered">
              <p className="title">
              PLU Code Hero
              </p>
              <p className="subtitle is-6">
              Champion of the Checkout Lane
              </p>
            </div>
          </div>
        </section>
        <section className="hero is-primary is-medium mt-6">

        <div className="hero-body">
        <h3 className="title is-4">Can you master an onslaught of price look-up (PLU) codes?</h3>
        <button
          className="button is-primary is-medium is-inverted mt-3"
          autoFocus
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
        </>
      );
    }
  }
}

