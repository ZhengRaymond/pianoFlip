#include <iostream>
#include <string>
#include <map>

using namespace std;

double loc = 0;


void keyPrint(int key, double dur, int note) {
	if (key) {
		cout << "note\t" << loc << "\t" << dur << "\t" << note << endl;
	}
	else {
		cout << "rest\t" << loc << "\t" << dur << "\t" << -1 << endl;
	}
}

// Usage: KEY OCTAVE DURATION

int main() {
	string key;
	double dur;
	int oct;

	map<string, int>keys;
	keys["C"] = 12;
	keys["Cs"] = 13;
	keys["D"] = 14;
	keys["Ds"] = 15;
	keys["E"] = 16;
	keys["F"] = 17;
	keys["Fs"] = 18;
	keys["G"] = 19;
	keys["Gs"] = 20;
	keys["A"] = 21;
	keys["As"] = 22;
	keys["B"] = 23;

	
	while (cin >> key) {
		cin >> oct >> dur;
		keyPrint(keys[key], (keys[key] + (12 * oct)), dur);
		loc += dur;
	}
}
