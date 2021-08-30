import { HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { pipe } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

export function httpResponseMap<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map(event => (event as HttpResponse<T>).body)
  );
}

export function watchUploadProgress<T>(callback: (progress: number) => void) {
  return tap(
    (event: HttpEvent<T>) => {
      if (event.type === HttpEventType.UploadProgress)
        callback(Math.round(event.loaded * 100 / event.total!));
    }
  );
}
