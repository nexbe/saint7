import { gql } from "@apollo/client";
export const GET_LEAVE_BY_ID = gql`
  query ($userId: ID!) {
    leaveInformations(
      filters: { users_permissions_user: { id: { eq: $userId } } }
      sort: ["createdAt:desc"]
      pagination: { limit: 100 }
    ) {
      data {
        id
        attributes {
          from
          to
          status
          reason
          numberOfDays
          leaveDuration
          leaveType
          halfdayOptions
          createdAt
          actionBy {
            data {
              id
              attributes {
                username
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
          requestedTos {
            data {
              id
              attributes {
                username
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
          users_permissions_user {
            data {
              id
              attributes {
                username
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                profile {
                  data {
                    id
                    attributes {
                      photo {
                        data {
                          id
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_LEAVES = gql`
  query ($userId: ID!) {
    leaveInformations(
      filters: { users_permissions_user: { id: { ne: $userId } } }
      sort: ["createdAt:desc"]
      pagination: { limit: 100 }
    ) {
      data {
        id
        attributes {
          from
          to
          status
          reason
          numberOfDays
          leaveDuration
          leaveType
          halfdayOptions
          createdAt
          actionBy {
            data {
              id
              attributes {
                username
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
          requestedTos {
            data {
              id
              attributes {
                username
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
          users_permissions_user {
            data {
              id
              attributes {
                username
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                profile {
                  data {
                    id
                    attributes {
                      photo {
                        data {
                          id
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_LEAVES_BY_REQUEST = gql`
  query ($userId: ID!, $requestedTos: ID) {
    leaveInformations(
      filters: {
        and: [
          { users_permissions_user: { id: { ne: $userId } } }
          { requestedTos: { id: { eq: $requestedTos } } }
        ]
      }
      sort: ["createdAt:desc"]
      pagination: { limit: 100 }
    ) {
      data {
        id
        attributes {
          from
          to
          status
          reason
          numberOfDays
          leaveDuration
          leaveType
          halfdayOptions
          createdAt
          actionBy {
            data {
              id
              attributes {
                username
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
          requestedTos {
            data {
              id
              attributes {
                username
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
          users_permissions_user {
            data {
              id
              attributes {
                username
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                profile {
                  data {
                    id
                    attributes {
                      photo {
                        data {
                          id
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_LEAVES_BY_CHOSEN_FIELDS = gql`
  query ($userId: ID!) {
    leaveInformations(
      filters: {
        or: [
          { users_permissions_user: { id: { eq: $userId } } }
          { requestedTos: { id: { eq: $userId } } }
        ]
      }
      sort: ["createdAt:desc"]
      pagination: { limit: 100 }
    ) {
      data {
        id
        attributes {
          from
          to
          status
          reason
          numberOfDays
          leaveDuration
          leaveType
          halfdayOptions
          createdAt
          actionBy {
            data {
              id
              attributes {
                username
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
          requestedTos {
            data {
              id
              attributes {
                username
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
          users_permissions_user {
            data {
              id
              attributes {
                username
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                profile {
                  data {
                    id
                    attributes {
                      photo {
                        data {
                          id
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
