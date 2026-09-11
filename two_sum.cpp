#include <iostream>
#include <unordered_map>
#include <vector>

class Solution {
public:
  std::vector<int> twoSum(const std::vector<int> &nums, int target) {
    std::unordered_map<int, int> numMap;

    for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
      int complement = target - nums[i];

      if (numMap.find(complement) != numMap.end()) {
        return {numMap[complement], i};
      }

      numMap[nums[i]] = i;
    }

    return {};
  }
};

void printResult(const std::vector<int> &nums, int target,
                 const std::vector<int> &result) {
  std::cout << "Array: [";
  for (size_t i = 0; i < nums.size(); ++i) {
    std::cout << nums[i] << (i + 1 < nums.size() ? ", " : "");
  }
  std::cout << "], Target: " << target << "\n";

  if (result.size() == 2) {
    std::cout << "Indices: [" << result[0] << ", " << result[1] << "]\n";
    std::cout << "Values: " << nums[result[0]] << " + " << nums[result[1]]
              << " = " << target << "\n\n";
  } else {
    std::cout << "No two sum solution found.\n\n";
  }
}

int main() {
  Solution solution;

  std::vector<int> nums1 = {2, 7, 11, 15};
  int target1 = 9;
  std::vector<int> res1 = solution.twoSum(nums1, target1);
  std::cout << "Test Case 1:\n";
  printResult(nums1, target1, res1);

  std::vector<int> nums2 = {3, 2, 4};
  int target2 = 6;
  std::vector<int> res2 = solution.twoSum(nums2, target2);
  std::cout << "Test Case 2:\n";
  printResult(nums2, target2, res2);

  std::vector<int> nums3 = {3, 3};
  int target3 = 6;
  std::vector<int> res3 = solution.twoSum(nums3, target3);
  std::cout << "Test Case 3:\n";
  printResult(nums3, target3, res3);

  std::vector<int> nums4 = {-1, -2, -3, -4, -5};
  int target4 = -8;
  std::vector<int> res4 = solution.twoSum(nums4, target4);
  std::cout << "Test Case 4:\n";
  printResult(nums4, target4, res4);

  return 0;
}
