#include <iostream>
#include <string>
#include <map>

using namespace std;

double d = 0;


void keyPrint(int key, int oct, double dur) {
	if (key) {
		cout << "note\t" << d << "\t" << dur << "\t" << oct << "\t126" << endl;
	}
	else {
		cout << "rest\t" << d << "\t" << dur << "\t" << -1 << "\t126" << endl;
	}
}

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
		cin >> oct;
		cin >> dur;
		keyPrint(keys[key], (keys[key] + (12 * oct)), dur);
		d += dur;
	}
}
