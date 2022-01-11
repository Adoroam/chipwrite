# installation
clone this repo

`git clone git@github.com:Adoroam/chipwrite.git`

change to the project directory

`cd chipwrite/`

install node modules

`npm install`

register with PATH

`npm link`


## usage
To view help table:

`chipwrite -h`

flags may be stacked, for example if you would like to write a yolol file to a chip that already has some old text on it while in the ship editor and omit the comments, you could try something like:

`chipwrite -f somefile.yolol -tne`

## troubleshooting
The last sucessful build was created on node v17.0.1. Robotjs can be a bit finicky sometimes depending on what node version you're using. This was designed on windows for windows but that's only because starbase doesn't have linux support yet. More testing needs to be done. 