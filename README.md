# Spotify CLone

![image](https://user-images.githubusercontent.com/47516691/228567914-5fb93fdd-c2be-4912-94f6-b697794ef66c.png)


## Alive site: https://spot-clone-xi.vercel.app/

This is React-Spotify app, a React front-end client that communicates with the Spotify API.

The public API provided by Spotify for Developers was used to create this project. 
To start working with the API and the site, you need to go through the authorization process.

### Authorization goes through the Spotify system itself, so you don't have to worry about the security of your data. Spotify implements the OAuth 2.0 authorization framework

The goal of this project was to create a clone of the famous music platform Spotify. Which will display new releases, popular playlists, song pages with their lyrics, etc.

![image](https://user-images.githubusercontent.com/47516691/228569190-47fdfe70-67e9-4eb1-bea0-75d93ef9c439.png)


The lyrics were taken from the public API of Musixmatch Developer. This API has a limit of 2k calls per day, so there is a possibility that the lyrics of the song will not be displayed if the limit is exceeded.

The library is used to play tracks Howler.js. howler.js is an audio library for the modern web. It defaults to Web Audio API and falls back to HTML5 Audio. This makes working with audio in JavaScript easy and reliable across all platforms. Spotify API only provides 30 seconds of track preview, some tracks don't even have 30 seconds available at all.

## ------- In this program, it is possible to add tracks to "Liked songs" or remove them from there. This function affects your data in Spotify (when you add or remove tracks, they will also be added or removed in your Spotify account) -------

### In this project, i used:

- ReactJS and TypeScript
- Using React Bootstrap, React Router, React Icons, React Spinners, Cdbreact
- Fetching data from unlimited sources using Rest API.
- The authorization process through the Spotify system
- Howler.js audio library. 

Setup: run npm i && npm start - to start the development server
