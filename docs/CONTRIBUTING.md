# Contributing to Insights UI

## PR Practices

- Have 2 people review and approve your PR before merging to make sure everything that gets in is vetted!
- Ensure all work has unit and e2e test coverage, as part of the PRs ideally.
- Include the Jira issue number (when possible) in the PR title to allow us to link PRs to given Jira issues.
- Assign reviewers to your PR appropriate for the content.
- Sprint related work should always be the prioroty.
- Non-sprint related work, such as test and performance enhancements, should be built / merged when there are not sprint PRs waiting to be built / merged. Be mindful of upcoming delivery milestones when considering these enhancements.
- Branch name should be lowercase.

## Labels

We use [labels](https://help.github.com/en/articles/about-labels) to help us organize our PRs.
Here are some of the most important:

| Label           | Description                                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DO_NOT_MERGE`  | Indicates that a PR should NOT be merged                                                                                                           |
| `FIXES_DEVELOP` | Indicates that a PR fixes an issue on develop so we can get it in ASAP                                                                             |
| `LOW_PRIORITY`  | Indicates that a PR is not directly related to a sprint                                                                                            |
| `NO_PIPE`       | Causes Jenkins not to run a build (when it is in place before a commit)<br>Use on new PRs where the build is not required to cut down on resources |
