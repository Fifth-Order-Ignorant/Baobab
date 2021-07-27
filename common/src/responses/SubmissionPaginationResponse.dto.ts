import { AssignmentSubmissionResponse } from "./AssignmentSubmissionResponse.dto"

export class SubmissionPaginationResponse {
  data!: AssignmentSubmissionResponse[];
  total!: number;
}
