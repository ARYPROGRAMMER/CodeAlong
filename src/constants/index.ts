import { Clock, Code2, Calendar, Users } from "lucide-react";

export const INTERVIEW_CATEGORY = [
  { id: "upcoming", title: "Upcoming Interviews", variant: "outline" },
  { id: "completed", title: "Completed", variant: "secondary" },
  { id: "succeeded", title: "Succeeded", variant: "default" },
  { id: "failed", title: "Failed", variant: "destructive" },
] as const;

export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export const QUICK_ACTIONS = [
  {
    icon: Code2,
    title: "New Call",
    description: "Start an instant call",
    color: "primary",
    gradient: "from-primary/10 via-primary/5 to-transparent",
  },
  {
    icon: Users,
    title: "Join Interview",
    description: "Enter via invitation link",
    color: "purple-500",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
  },
  {
    icon: Calendar,
    title: "Schedule",
    description: "Plan upcoming interviews",
    color: "blue-500",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
  },
  {
    icon: Clock,
    title: "Recordings",
    description: "Access past interviews",
    color: "orange-500",
    gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
  },
];

export const CODING_QUESTIONS: CodeQuestion[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers in the array such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}`,
      python: `def two_sum(nums, target):
    # Write your solution here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
    },
    constraints: [
      "2 ≤ nums.length ≤ 104",
      "-109 ≤ nums[i] ≤ 109",
      "-109 ≤ target ≤ 109",
      "Only one valid answer exists.",
    ],
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your solution here
  
}`,
      python: `def reverse_string(s):
    # Write your solution here
    pass`,
      java: `class Solution {
    public void reverseString(char[] s) {
        // Write your solution here
        
    }
}`,
    },
  },
  {
    id: "palindrome-number",
    title: "Palindrome Number",
    description:
      "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.\n\nAn integer is a palindrome when it reads the same forward and backward.",
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation:
          "121 reads as 121 from left to right and from right to left.",
      },
      {
        input: "x = -121",
        output: "false",
        explanation:
          "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.",
      },
    ],
    starterCode: {
      javascript: `function isPalindrome(x) {
  // Write your solution here
  
}`,
      python: `def is_palindrome(x):
    # Write your solution here
    pass`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your solution here
        
    }
}`,
    },
  },
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    description:
      "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
      },
      {
        input: 's = "rat", t = "car"',
        output: "false",
      },
    ],
    starterCode: {
      javascript: `function isAnagram(s, t) {
  // Write your solution here
  
}`,
      python: `def is_anagram(s, t):
    # Write your solution here
    pass`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        // Write your solution here
        
    }
}`,
    },
    constraints: [
      "1 ≤ s.length, t.length ≤ 5 * 104",
      "s and t consist of lowercase English letters",
    ],
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    description:
      "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.\n\nA **subarray** is a contiguous non-empty sequence of elements within an array.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
      },
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your solution here
  
}`,
      python: `def max_sub_array(nums):
    # Write your solution here
    pass`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your solution here
        
    }
}`,
    },
    constraints: [
      "1 ≤ nums.length ≤ 105",
      "-104 ≤ nums[i] ≤ 104",
    ],
  },
  {
    id: "merge-sorted-arrays",
    title: "Merge Sorted Arrays",
    description:
      "You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.\n\nMerge `nums1` and `nums2` into a single array sorted in non-decreasing order.\n\nThe final sorted array should not be returned by the function, but instead be stored inside the array `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to 0 and should be ignored. `nums2` has a length of `n`.",
    examples: [
      {
        input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
        output: "[1,2,2,3,5,6]",
        explanation: "The arrays we are merging are [1,2,3] and [2,5,6]. The result is [1,2,2,3,5,6].",
      },
      {
        input: "nums1 = [1], m = 1, nums2 = [], n = 0",
        output: "[1]",
        explanation: "The arrays we are merging are [1] and []. The result is [1].",
      },
    ],
    starterCode: {
      javascript: `function merge(nums1, m, nums2, n) {
  // Write your solution here
  
}`,
      python: `def merge(nums1, m, nums2, n):
    # Write your solution here
    pass`,
      java: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // Write your solution here
        
    }
}`,
    },
    constraints: [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 ≤ m, n ≤ 200",
      "1 ≤ m + n ≤ 200",
      "-109 ≤ nums1[i], nums2[j] ≤ 109",
    ],
  }
];

export const LANGUAGES = [
  { id: "javascript", name: "JavaScript", icon: "/javascript.png" },
  { id: "python", name: "Python", icon: "/python.png" },
  { id: "java", name: "Java", icon: "/java.png" },
] as const;

export interface CodeQuestion {
  id: string;
  title: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  starterCode: {
    javascript: string;
    python: string;
    java: string;
  };
  constraints?: string[];
}

export type QuickActionType = (typeof QUICK_ACTIONS)[number];
