#!/bin/bash

inc=0
while read line
do
  inc=$((inc+0.75))
  if [ $line == "C" ]
  then 
    echo -e "note\t${1}\t0.75\t60\t126\n" >> test.txt
  elif [ $line == "G" ]
  then 
    echo -e "note\t${1}\t0.75\t60\t126\n" >> test.txt 
  fi
done
echo "finish"
./text2midi test.txt test.midi
