import java.util.*;

public class TwoSum {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> numMap = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            if (numMap.containsKey(complement)) {
                return new int[] { numMap.get(complement), i };
            }

            numMap.put(nums[i], i);
        }

        return new int[] {};
    }

    public static void main(String[] args) {
        int[] nums1 = {2, 7, 11, 15};
        int target1 = 9;
        System.out.println("Test Case 1: " + Arrays.toString(twoSum(nums1, target1)));

        int[] nums2 = {3, 2, 4};
        int target2 = 6;
        System.out.println("Test Case 2: " + Arrays.toString(twoSum(nums2, target2)));

        int[] nums3 = {3, 3};
        int target3 = 6;
        System.out.println("Test Case 3: " + Arrays.toString(twoSum(nums3, target3)));

        int[] nums4 = {-1, -2, -3, -4, -5};
        int target4 = -8;
        System.out.println("Test Case 4: " + Arrays.toString(twoSum(nums4, target4)));
    }
}
