#include <iostream>
#include <string>
#include <map>

using namespace std;

double d = 0;


void keyPrint(int key, double dur) {
	if (key) {
		cout << "note\t" << d << "\t" << dur << "\t" << key << "\t126" << endl;
	}
	else {
		cout << "rest\t" << d << "\t" << dur << "\t" << key << "\t126" << endl;
	}
}

int main() {
	string key;
	double dur;

	map<string, int>keys;
	keys["C"] = 60;
	keys["Cs"] = 61;
	keys["D"] = 62;
	keys["Ds"] = 63;
	keys["E"] = 64;
	keys["F"] = 65;
	keys["Fs"] = 66;
	keys["G"] = 67;
	keys["Gs"] = 68;
	keys["A"] = 69;
	keys["As"] = 70;
	keys["B"] = 71;

	
	while (cin >> key) {
		cin >> dur;
		keyPrint(keys[key], dur);
		d += dur;
	}
}
