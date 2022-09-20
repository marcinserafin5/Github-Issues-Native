import {gql} from '@apollo/client';

export const GET_USERS = gql`
query ($query: String = "") {
  search(query: $query, type: USER, first: 5) {
    edges {
      node {
        ... on User {
          id
          login
          name
          avatarUrl
          location
          bio
          followers {
            totalCount
          }
          following {
            totalCount
          }
          starredRepositories {
            totalCount
          }
        }
      }
    }
    userCount
  }
}
`;

export const GET_REPOS = gql`
query ($query: String = "") {
  search(query: $query, type: REPOSITORY, first: 5) {
    edges {
      node {
        ... on Repository {
          id
          description
          name
          updatedAt
          stargazerCount
          languages(first: 1) {
            edges {
              node {
                id
                name
                color
              }
            }
          }
          licenseInfo {
            name
          }
        }
      }
    }
    repositoryCount
  }
}
`;