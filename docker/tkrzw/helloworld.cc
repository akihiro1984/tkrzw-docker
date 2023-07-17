#include "tkrzw_dbm_hash.h"

int main(int argc, char** argv) {
  tkrzw::HashDBM dbm;
  dbm.Open("casket.tkh", true).OrDie();
  dbm.Set("hello", "world").OrDie();
  std::cout << dbm.GetSimple("hello") << std::endl;
  dbm.Close().OrDie();
  return 0;
}