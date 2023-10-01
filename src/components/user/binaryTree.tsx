import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUsers } from '../../hooks/useUsers'; // Import the custom hook

const TreeNode: React.FC<{ data: any }> = ({ data }) => (
  <div className="flex flex-col items-center">
    <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
      {data.value}
    </div>
    <div className="flex mt-2 space-x-4">
      {data.left && <TreeNode data={data.left} />}
      {data.right && <TreeNode data={data.right} />}
    </div>
  </div>
);

const BinaryTree = () => {
  const { fetchChildInfo } = useUsers(); // Use the fetchTreeData function from the custom hook
  const [treeData, setTreeData] = useState(null);
  console.log(treeData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchChildInfo();
        if (response !== undefined) {
          setTreeData(response); // Assuming the response contains the binary tree structure
        } else {
          console.error('No data received from fetchChildInfo.');
        }
      } catch (error) {
        console.error('Error fetching binary tree data:', error);
      }
    };
  
    fetchData();
  }, [fetchChildInfo]);
  

  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-2xl font-bold mb-4">Binary Tree</h2>
      <div className="flex justify-center">
        {treeData ? <TreeNode data={treeData} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default BinaryTree;
