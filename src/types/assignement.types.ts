
export interface IAssignmentSubmitState {
    assignmentId?: string;
    description: string;
    existingFiles: string[];
    removedExistingFiles: string[];
    files: File[];
    urls: string[];
    progress: number;
    completionStatus: 'pending' | 'full' | 'partial';
}