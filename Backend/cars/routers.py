from fastapi import APIRouter, Depends, Body, HTTPException, status, Request
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from datetime import datetime, timedelta
from typing import Annotated, List, Optional

from cars.schema import CarResponseSchema, CarCreateSchema, CarSchema
from sqlalchemy.orm import Session
from database import get_db

from .models import CarModel

from auth.models import User
# from auth.utils import filter_none_and_empty_fields
# from driver.dependencies import get_current_user_by_jwtoken, get_token_header
from auth.oauth2 import get_current_user

router = APIRouter(tags=['Authentication'])

router = APIRouter(
    
    tags=["cars"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)

@router.post("/create", response_description="create a car object", response_model=CarResponseSchema, status_code=status.HTTP_201_CREATED)
async def create_car(car: CarCreateSchema, user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    db_car = CarModel(**car.model_dump(), user_id=user.user_id)
    db.add(db_car)
    db.commit()
    db.refresh(db_car)
    return db_car

@router.put("/update/{car_id}/car", response_description="update a car's information", response_model=CarResponseSchema)
async def update_car(car_id: int, car: CarSchema, user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    db_car = db.query(CarModel).filter(CarModel.id == car_id).first()
    if not db_car:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Car with id {car_id} not found")
    if db_car.user_id != user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User has no access to this car")
    for key, value in car.model_dump(exclude_unset=True).items():
        setattr(db_car, key, value)
    db.add(db_car)
    db.commit()
    db.refresh(db_car)
    return db_car

@router.get("/{car_id}/car", response_description="get a car by id", response_model=CarResponseSchema)
async def get_car_by_id(car_id: int, user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    car = db.query(CarModel).filter(CarModel.id == car_id).first()
    if car:
        return car
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Car with id {car_id} not found")

@router.get("/check/user/cars", response_description="check if user has any available car")
async def check_user_cars(user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    car = db.query(CarModel).filter(CarModel.user_id == user.user_id).first()
    if car:
        return JSONResponse(content={"status": True, "message": "user has a valid vehicle"}, status_code=status.HTTP_200_OK)
    return JSONResponse(content={"status": False, "message": "user has no valid vehicle attached to their profile"})

@router.get("/user/all", response_description="get all a user's cars", response_model=List[CarResponseSchema])
async def get_user_cars(user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    cars = db.query(CarModel).filter(CarModel.user_id == user.user_id).all()
    return cars

@router.delete("/{car_id}/delete", response_description="delete a car by id")
async def delete_car_by_id(car_id: int, user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    car = db.query(CarModel).filter(CarModel.id == car_id).first()
    if car:
        if car.user_id == user.user_id:
            db.delete(car)
            db.commit()
            return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "car deleted successfully"})
        return JSONResponse(status_code=status.HTTP_403_FORBIDDEN, content={"message": "User has no access to car"})
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"message": f"car with id: {car_id} not found!"})