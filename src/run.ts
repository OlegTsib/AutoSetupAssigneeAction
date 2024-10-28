import * as core from '@actions/core'
import { getInput } from "@actions/core"
import { context, getOctokit } from "@actions/github"
import { PullRequestEvent } from '@octokit/webhooks-types'
import GitHubService from "./git_hub_service"

export async function run() {
    const token = getInput("GITHUB_TOKEN")
    const gitHubClient = getOctokit(token)
    const gitHubService = new GitHubService(gitHubClient, context)
    const { pull_request: event } = context.payload as PullRequestEvent
    const assignees = [event.user.login]

    await gitHubService.addAssignees(assignees)
    core.info(`Added assignees to PR #${event.number}: ${assignees.join(', ')}`)
}
