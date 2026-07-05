import mongoose from "mongoose";
import Contact from "../models/Contact.js";
import logger from "../utils/logger.js";

const fallbackContacts = [];

/**
 * @desc    Create Contact Message
 * @route   POST /api/contact
 */
export const createContact = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const fallbackContact = {
        _id: `${Date.now()}`,
        ...req.body,
        createdAt: new Date().toISOString(),
      };

      fallbackContacts.unshift(fallbackContact);

      logger.warn("MongoDB unavailable, storing contact in fallback memory.");

      return res.status(201).json({
        success: true,
        message: "Contact message submitted successfully.",
        data: fallbackContact,
      });
    }

    const contact = await Contact.create(req.body);

    logger.info(`New contact submitted by ${contact.email}`);

    return res.status(201).json({
      success: true,
      message: "Contact message submitted successfully.",
      data: contact,
    });
  } catch (error) {
    const fallbackContact = {
      _id: `${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString(),
    };

    fallbackContacts.unshift(fallbackContact);

    logger.error(`Failed to create contact: ${error.message}`);

    return res.status(201).json({
      success: true,
      message: "Contact message submitted successfully.",
      data: fallbackContact,
    });
  }
};

/**
 * @desc    Get All Contacts
 * @route   GET /api/contact
 */
export const getAllContacts = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        count: fallbackContacts.length,
        data: fallbackContacts,
      });
    }

    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    logger.error(`Failed to fetch contacts: ${error.message}`);

    return res.status(200).json({
      success: true,
      count: fallbackContacts.length,
      data: fallbackContacts,
    });
  }
};

/**
 * @desc    Delete Contact
 * @route   DELETE /api/contact/:id
 */
export const deleteContact = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const index = fallbackContacts.findIndex(
        (contact) => contact._id === req.params.id
      );

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: "Contact not found.",
        });
      }

      fallbackContacts.splice(index, 1);

      return res.status(200).json({
        success: true,
        message: "Contact deleted successfully.",
      });
    }

    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    logger.info(`Contact deleted : ${req.params.id}`);

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully.",
    });
  } catch (error) {
    logger.error(`Failed to delete contact: ${error.message}`);

    return res.status(500).json({
      success: false,
      message: "Unable to delete contact right now.",
    });
  }
};