<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="client/public/favicon.ico" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Mickaël Lalanne</h3>

  <p align="center">
    Triple Triad
    <br />
    <a href="https://www.mickael-lalanne.fr/triple-triad" style="font-size: 20px;"><strong>See in action</strong></a>
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About the project

[![Product Name Screen Shot][product-screenshot]](https://www.mickael-lalanne.fr/triple-triad)

Triple Triad is a minigame from the Final Fantasy universe. <br/>
It's played on a three-by-three grid, totaling nine spaces, with each player utilizing a deck of 5 cards. Every card has a number on each side to represent the strength of that side. Once the match begins, each player uses their turn to place a card on an empty space on the board. If you place a card next to an opponent's card, and if the number facing the opponent's card is higher than their number, you take over the opponent's card. <br/>
After all nine spaces on the board have been filled, the winner is the player who controls the most cards.

In this version of the game, you can:
* play in local mode, where two players choose their decks before playing on the same screen. <br/>
Later, the player will have the possibility to play against an AI or to play online. You can check the <a href="#roadmap">roadmap</a> to see more.
* Manage your own decks: create, edit and delete your decks as you wish

From a technical perspective, ***AWS Amplify*** is used to:
* Have an authentication page with possibility to log in or sign up, forgot password mechanism and email confirmation.
* Save decks in database with a ***Graphql*** api

<br> ***Vuetify*** is used for the design part, but will also be used for the translation.

***Vue router*** library is used to have some routes like the login or the roadmap page.

***Pinia*** is used to save decks in a store, in order to make them available anywhere in the app.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [![Vue][Vue.js]][Vue-url]
* [![Typescript][Typescript]][Typescript-url]
* [![Amplify][Amplify]][Amplify-url]
* [![Vuetify][Vuetify.js]][Vuetify-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* [Nodejs](https://nodejs.org/en)

* amplify
  ```sh
  npm install -g @aws-amplify/cli@latest
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/mickael-lalanne/triple-triad.git
   ```
2. Go in _client_ folder
   ```sh
   cd client
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
2. Launch the project locally
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] Button to display the game rules to the user
- [ ] Multi-language support
    - [x] English
    - [ ] French
- [ ] AI mode
- [ ] Setting to switch between dark and ligh theme
- [ ] Responsive for mobile and tablets
- [ ] Google authentication
- [ ] Online mode
- [ ] Android application

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Mickaël Lalanne - mickael.lalanne03@gmail.com

[![LinkedIn][linkedin-shield]][linkedin-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [AWS Amplify - Getting Started with Vue](https://docs.amplify.aws/start/getting-started/installation/q/integration/vue/)
* [Triple Triad cards list](https://finalfantasy.fandom.com/wiki/Final_Fantasy_XIV_Triple_Triad_cards)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/mickael-lalanne/
[product-screenshot]: images/preview.gif
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Vuetify.js]: https://img.shields.io/static/v1?style=for-the-badge&message=Vuetify&color=1867C0&logo=Vuetify&logoColor=FFFFFF&label
[Vuetify-url]: https://vuetifyjs.com/en/
[Amplify]: https://img.shields.io/static/v1?style=for-the-badge&message=AWS+Amplify&color=222222&logo=AWS+Amplify&logoColor=FF9900&label=
[Amplify-url]: https://aws.amazon.com/amplify/
[Typescript]: https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=
[Typescript-url]: https://www.typescriptlang.org/