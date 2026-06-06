#include <iostream>
#include <ctime>

int main(){
	std::cout << "Hello ASL!\n";

	std::time_t t = std::time(nullptr);

	char buffer[11];

	std::strftime(buffer, sizeof(buffer), "%y-%m-%d", std::localtime(&t));

	std::cout << buffer << "\n";

	return 0;
}