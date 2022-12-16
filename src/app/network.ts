import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Jobs } from '../models/job';
import { MasterClassModule } from '../app/class';
import { JobService } from '../service/job.service';


@Injectable({
  providedIn: 'root'
})
export class NetworkService {
    constructor(private api: JobService){

    }

    getAllJobs(): Observable<Jobs[]> {
        return this.api.getDataJob();
    }
}