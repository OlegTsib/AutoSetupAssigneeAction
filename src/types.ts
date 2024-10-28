import * as github from '@actions/github'

export type GitHubClient = ReturnType<typeof github.getOctokit>