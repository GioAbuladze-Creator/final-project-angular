import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class UsersService {
    constructor(
        private http: HttpClient
    ) { }

    fetchUsers() {
        return this.http.get<User[]>('http://localhost:3000/users')
    }
    findUser(email: string, password: string) {
        return this.fetchUsers().pipe(
            map((users) => {
                return users.find((user) => {
                    return user.email == email && user.password == password
                })
            })
        )
    }
    checkUser(email: string,number: string) {
        return this.fetchUsers().pipe(
            map((users) => {
                return users.find((user) => {
                    return user.email == email || user.phone == number
                })
            })
        )
    }
    addUser(user: User) {
        return this.http.post<User>('http://localhost:3000/users', user)
    }
    updateUser(user: User) {
        return this.http.put<User>(`http://localhost:3000/users/${user.id}`, user)
    }
    deleteUser(id: number) { 
        return this.http.delete<User>(`http://localhost:3000/users/${id}`)
    }
}