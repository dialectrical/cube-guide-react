import './App.css';
import ReactDOM from 'react-dom';
import React from 'react';
const mtg = require('mtgsdk');


class CardImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      card: null
    }
  }

  async componentDidMount() {
    const response = await mtg.card.where({name: this.props.name});
    this.setState({ card: response[0].imageUrl, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.card) {
      return <div>didn't get a card</div>;
    }

    return (
      <div>
        <img src={this.state.card} />
      </div>
    );
  }
}

class CardBank extends React.Component {
  render() {
    let cardBank;
    cardBank = this.props.cards.map((cardObj, i, cardArr) => {
      return (
        <CardImage
          name={cardArr[i]}
        />
      )
    });
    return (
      <div className='card-bank'>{cardBank}</div>
    );
  }
}

class SectionBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      card: null
    };
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <h2>{this.props.header}</h2>
        <div>
          <p>{this.props.text}</p>
        </div>
        <div>
          <CardBank cards={this.props.cards} />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Heading 1 <i class="ms ms-g"></i></h1>
        <h2>Heading 2 <i class="ms ms-r"></i></h2>
        <h3>Heading 3 <i class="ms ms-u"></i></h3>
        <h4>Heading 4 <i class="ms ms-b"></i></h4>
        <h5>Heading 5 <i class="ms ms-w"></i></h5>
        <SectionBuilder
          header="section 1"
          text="section text"
          cards={["Mountain", "Swamp", "Gray Merchant of Asphodel"]}
        />
        <SectionBuilder
          header="section 2"
          text="section 2 text"
          cards={["Island", "Barren Moor", "Urza, Headmaster", "Birds", "Mountain", "Mountain", "Avacyn"]}
        />
      </div>
    );
  }
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"))
