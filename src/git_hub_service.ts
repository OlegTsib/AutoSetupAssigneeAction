import * as core from '@actions/core'
import { GitHubClient } from './types'
import { Context } from '@actions/github/lib/context'

export class GitHubService {
    private client: GitHubClient 
    private context: Context

    constructor(client: GitHubClient, context: Context) {
        this.client = client
        this.context = context
    }

    async addAssignees(assignees: string[]): Promise<void> {
        const { owner, repo, number: issue_number } = this.context.issue
        const result = await this.client.rest.issues.addAssignees({
          owner,
          repo,
          issue_number,
          assignees,
        })
        core.debug(JSON.stringify(result))
      }
}

export default GitHubService
