#!/bin/sh 
NODE_OPTIONS=--max-old-space-size=4096 npx ts-node ./$1dec.ts $1 $2