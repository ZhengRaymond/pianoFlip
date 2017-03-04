#include <iostream>
#include <fstream>
#include <string>
#include <cmath>
#include <sstream>

using namespace std;


ifstream segmentFile("segment.txt");

class MIDIEntry {
public:
	string type;
	float location;
	float duration;
	int note;
	MIDIEntry *previous;
	MIDIEntry *next;
	MIDIEntry(string t, float l, float d, int n, MIDIEntry* p);
	float compare(MIDIEntry& m);
	// string toString();
	void toString();
};

MIDIEntry::MIDIEntry(string t, float l, float d, int n, MIDIEntry* p) : type(t), location(l), duration(d), note(n), previous(p), next(nullptr) {
	// do nothing
}

// string MIDIEntry::toString() {
void MIDIEntry::toString() {
	cout << type << "\t" << location << "\t" << duration << "\t" << note << endl;
	// return this.type + "\t" + location
}
	
/*  Returns a floating point representing how similar the two MIDIEntrys are. 0.0 = not similar at all, 1.0 = perfect match.
 *  current coefficients:
 *     type must match.
 *     location = 0.5
 *     duration = 0.1 
 *     note = 0.4
 */
float MIDIEntry::compare(MIDIEntry& m) {
	//float result = 0.0;

	//if (this.type != m.type) {
	//	if ()
	//}
	//
	//if (this.location == m.location) {
	//	result += 0.5;
	//}
	//else if (abs(this.location - m.location) < 0.5) {
	//	result += 0.3; // out of 0.5
	//}
	//else if (abs(this.location - m.location) < 1) {
	//	result += 0.1; // out of 0.5
	//}

	//if (this.duration == m.duration) {
	//	result += 0.1;
	//}
	//else if (abs(this.duration - m.duration) < 0.5) {
	//	result += 0.08; // out of 0.10
	//}
	return 0;
}

MIDIEntry* initialize() {
	ifstream scoreFile("score.txt");
	MIDIEntry * start = new MIDIEntry("rest", 0, 0, 0, nullptr);
	string line;
	MIDIEntry* prev = nullptr;
	MIDIEntry* curr = start;
	while (getline(scoreFile, line)) {
		string item, newType;
		stringstream ss(line);
		getline(ss, newType, '\t');
		getline(ss, item, '\t');
		float newLocation = stof(item);
		getline(ss, item, '\t');
		float newDuration = stof(item);
		getline(ss, item, '\t');
		int newNote = stof(item);

		MIDIEntry * nextEntry = new MIDIEntry(newType, newLocation, newDuration, newNote, curr);
		curr->next = nextEntry;
		curr = nextEntry;
	}
	return start;
}


int main() {

	MIDIEntry * start = initialize();

	// PRINT OUT SCORE ******************
	// MIDIEntry * curr = start;
	// while (curr->next != nullptr) {
	// 	curr->toString();
	// 	curr = curr->next;
	// }
	// **********************************

	while ()

	// int prevLoc = 0;
	// int maxFitness = 0;
	// int maxLoc = 0;

	// int nextNote;
	// while (cin >> nextNote) {



	// 	//MAKE CHANGE BECAUSE MATCH
	// 	// prevLoc = currLoc;
	// 	// currLoc = newLoc;

	// }
}