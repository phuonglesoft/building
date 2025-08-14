
import { CognitoIdentityServiceProvider } from 'aws-sdk';

const cognito = new CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION || 'us-east-1',
});

export const addUserToGroup = async (username: string, groupName: string) => {
  const params = {
    GroupName: groupName,
    UserPoolId: process.env.COGNITO_USER_POOL_ID || '',
    Username: username,
  };

  try {
    await cognito.adminAddUserToGroup(params).promise();
    console.log(`User ${username} added to ${groupName} group`);
  } catch (err) {
    console.error('Error adding user to group:', err);
    throw err;
  }
};

addUserToGroup('user@example.com', 'admin');