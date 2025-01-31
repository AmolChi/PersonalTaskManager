export type User = {
    id: string,
    email: string,
    password: string,
    tasks: Task[],
    name: string
}

export type status= "pending"|"completed"

export type Task = {
    id: string,
    title: string,
    description: string,
    dueDate: string,
    status: status
}

export type UserState = {
    users: User[],
    activeUser: User | null
}

export type ScreenNames = ["Login", "Register", "LandingPage"] 

export type UserRegister = {
    name:string,
    password:string,
    confirmPassword:string,
    email:string
}

export type TaskError = {
    titleError:string,
    descError:string,
}
