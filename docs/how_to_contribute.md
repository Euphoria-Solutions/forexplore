
## Contribution Workflow

To maintain an organized and efficient development process, we follow a specific workflow involving GitHub issues, branching, coding, and pull requests. Here's a step-by-step guide:

### 1. Creating an Issue

Before starting work on a new feature or bug fix, ensure there's a corresponding GitHub issue in our project's repository. This issue should clearly describe the task, feature request, or bug report. If an issue doesn't exist, create one and provide as much detail as possible to describe what needs to be done or what problem needs to be fixed.

### 2. Branching from the Issue

Once you have an issue to work on, create a new branch from the `main` branch named in a way that reflects the issue you're working on. We recommend using a naming convention like `issue-<issue-number>-short-description`. For example, if you're working on issue #42, which is about adding a login feature, you might name your branch `issue-42-add-login`.

To create and switch to your new branch in Git, run:

```bash
git checkout -b issue-42-add-login
```

### 3. Writing Your Code

With your branch created, you're ready to start coding. Implement your feature, fix, or other changes according to the project's coding standards and best practices. Commit your changes locally as you make progress, using meaningful commit messages that describe the changes you're making.

### 4. Pushing Your Branch

Once you've completed your work and tested your changes, push your branch to the GitHub repository:

```bash
git push -u origin issue-42-add-login
```

### 5. Creating a Pull Request (PR)

After pushing your branch, go to the repository on GitHub. You'll likely see a prompt to create a pull request based on your recent push. If not, you can manually create a new PR by navigating to the "Pull Requests" tab and clicking "New Pull Request." Select your branch as the "compare" branch and the main project branch (`main`) as the "base" branch.

Fill out the PR form:
- **Title**: Give your PR a concise title that reflects the changes you've made.
- **Description**: Provide a detailed description of your changes. Reference the issue it resolves by including something like "Fixes #42" in the description.
- **Reviewers**: Assign reviewers for your PR. Choose team members who are familiar with the codebase or the specific features you're working on.
- **Project**: If your repository uses GitHub Projects, you can link your PR to the project for better tracking.

### 6. Review and Merge

Once your PR is created, assigned reviewers will be notified. They may provide feedback or request changes. Address any feedback, making additional commits to your branch as needed. Once your PR is approved, it can be merged into the main codebase.

Please ensure your branch is up to date with the main branch before merging. You might need to pull changes from the main branch and merge them into your branch if there have been updates since you started your work.

By following this workflow, we ensure that all changes are reviewed, maintain code quality, and keep our main branch stable.