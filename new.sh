#!/bin/sh 
FILE=$1dec.ts
if [ ! -f "$FILE" ]
  then
    cp template.ts $FILE
  else
    echo $FILE exists already
fi

touch data/$1dec.txt
touch samples/$1dec.txt