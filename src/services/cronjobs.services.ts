import { CronJob } from 'cron';
import {QuarterServices} from './quarters.service'
import { SubmissionService } from './submission.service';
import { UserService } from './user.service';

class NewYearJob {
    private cronJob: CronJob;

    constructor() {
        this.cronJob = new CronJob('0 0 1 1 *', async () => {
            try {
                await this.createQuaters();
                await this.createSubmissions()
            } catch (error) {
                console.error('Error executing scheduled task:', error);
            }
        });
        if (!this.cronJob.running) {
            this.cronJob.start();
        }
    }

    async createQuaters(): Promise<void> {
        const currentYear = new Date().getFullYear();
        const quaterCreator = new QuarterServices()
        for (let quarter = 1; quarter <= 4; quarter++){ 
            const startDate = new Date(currentYear, (quarter - 1) * 3, 1); 
            const endDate = new Date(currentYear, quarter * 3, 0); 
            await quaterCreator.createQuarter(quarter,currentYear,startDate,endDate)
        }
    }

    async createSubmissions(): Promise<void>{
        const userCreator = new UserService()
        const users = (await userCreator.getAllUsers()).filter((user) => user.role === "Representative")
        const currentYear = new Date().getFullYear();
        const submissionCreator = new SubmissionService()
        for (const u of users){
            for (let quarter = 1; quarter <= 4; quarter++){ 
                var status = "NOT_STARTED"
                if (quarter === 1){
                    status = "PENDING"
                }
                await submissionCreator.createSubmission(u.email,quarter,currentYear,status)
            }
        }
    }
}

const newYearJob = new NewYearJob();
