import { Request, Response } from "express";
import Testimonials from "../models/Testimonials";
import APIFeatures from "../utils/apiFeatures";

export const addTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonials.create(req.body);
    return res.status(201).json(testimonial);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await new APIFeatures(
      Testimonials.find(),
      req.query
    ).
    paginate().query;
    return res.status(200).json(testimonials);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getTestimonialById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const testimonial = await Testimonials.findById(id);
    return res.status(200).json(testimonial);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const testimonial = await Testimonials.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(testimonial);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const testimonial = await Testimonials.findByIdAndDelete(id);
    return res.status(200).json(testimonial);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
