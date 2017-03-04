#import <iostream>
#import <fstream>
#import <string>

using namespace std;

ifstream segmentFile("segment.txt");
ifstream scoreFile("score.txt");

string lastLoc() {
	
}

int main() {
  
  int lastLoc = 0;
  int maxFitness = 0;
  int maxLoc = 0;
  for (int i = 0; i < 20; i++) {
  	maxFitness -= i;
  	string line = noteAt(lastLoc);
  }



}