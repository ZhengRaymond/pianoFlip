#include <iostream>
#include <fstream>
#include <string>
#include <cmath>
#include <sstream>
#include <map>

using namespace std;


// ifstream segmentFile("segment.txt");
// GLOBALS;
map<string, int> KEYS;
double loc = 0;



class MIDIEntry {
public:
	string type;
	double location;
	double duration;
	int note;
	MIDIEntry *previous;
	MIDIEntry *next;
	MIDIEntry(string t, double l, double d, int n, MIDIEntry* p);
	double compare(MIDIEntry& m);
	// string toString();
	void toString();
};

MIDIEntry::MIDIEntry(string t, double l, double d, int n, MIDIEntry* p) : type(t), location(l), duration(d), note(n), previous(p), next(nullptr) {
	// do nothing
}

// string MIDIEntry::toString() {
void MIDIEntry::toString() {
	cout << type << "\t" << location << "\t" << duration << "\t" << note << endl;
	// return this.type + "\t" + location
}
	
/*  Returns a doubleing point representing how similar the two MIDIEntrys are. 0.0 = not similar at all, 1.0 = perfect match.
 *  current coefficients:
 *     type must match.
 *     location = 0.5
 *     duration = 0.1 
 *     note = 0.4
 */
double MIDIEntry::compare(MIDIEntry& m) {
	return 0
}

MIDIEntry* initialize() {
	 KEYS["C"] = 12;
	 KEYS["Cs"] = 13;
	 KEYS["D"] = 14;
	 KEYS["Ds"] = 15;
	 KEYS["E"] = 16;
	 KEYS["F"] = 17;
	 KEYS["Fs"] = 18;
	 KEYS["G"] = 19;
	 KEYS["Gs"] = 20;
	 KEYS["A"] = 21;
	 KEYS["As"] = 22;
	 KEYS["B"] = 23;

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
		double newLocation = stof(item);
		getline(ss, item, '\t');
		double newDuration = stof(item);
		getline(ss, item, '\t');
		int newNote = stof(item);

		MIDIEntry * nextEntry = new MIDIEntry(newType, newLocation, newDuration, newNote, curr);
		curr->next = nextEntry;
		curr = nextEntry;
	}
	return start;
}


int findNext(MIDIEntry *& key, MIDIEntry * input) {
	// type is different
	// if (key->type.compare(key->type) != 0) {
	// 	return -500; 
	// }

	// check note
	if (key->note == input->note ) {
		key = key->next; 
		return 0;
	}
	else if (key->next && key->next->note == input->note) {
		key = key->next->next;
		return 1;
	}
	else if (key->previous && key->previous->note == input->note) {
		// key stays the same since it was replayed
		return -1;
	}
	else {
		return 500;
	}
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

	if (!start) {
		return false; // failed initialization
	}
	MIDIEntry * prevEntry = nullptr;
	MIDIEntry * currentEntry = start->next;

	int key;
	double dur;
	int oct;
	string input;
	while (cin >> input) {
		dur = 0;
		oct = 4;
		string note;
		if (input == "q") {
			note = "C";
		} else if (input == "w") {
			note = "D";
		} else if (input == "e") {
			note = "E";
		} else if (input == "r") {
			note = "F";
		} else if (input == "t") {
			note = "G";
		} else if (input == "y") {
			note = "A";
		}
		key = KEYS[note] + 48;
		MIDIEntry * userEntry = new MIDIEntry("note", loc, dur, key, nullptr);	
		loc += dur;

		int result = findNext(currentEntry, userEntry);
		if (result == 0) { // found entry
			// adjust display
			cout << "SUCCESS:  User played " << note << oct << " at location " << loc << " for " << dur << " beats." << endl;
		}
		else if (result > 0) {
			cout << "SKIP:     USER skipped " << result << " notes.";
			cout << "          User played " << note << oct << " at location " << loc << " for " << dur << " beats." << endl;
		}
		else if (result < 0 && result > -500) {
			cout << "REPLAYED: USER replayed " << (-1 * result) << " notes.";
			cout << "          User played " << note << oct << " at location " << loc << " for " << dur << " beats." << endl;
		}
		else { // no entry, assume user mistake
			cout << "FAILURE:  User played mistake at location " << loc << endl;
		}
		loc = currentEntry->location;
		delete prevEntry;
		prevEntry = userEntry;
	}

}